const router = require('express').Router();
const User = require('../model/User.js');
const Word = require('../model/Word');
const validation = require('../core/auth/verifyToken');

const MAX_WORDS = 9999;
const MAX_RANGE_WORDS = 100;
const WHEN_USER_KNOW_WORD = 3;
const SEND_KNOWN_WORD_CHANCE = 0.1;

function isRight(answer) {
    if (answer === undefined) return false;
    return answer;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // pow for more small numbers
    // use pow only when ask for unknon word
    return Math.floor(Math.pow(Math.random(), 2) * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function genRandomIndex(NotAllow, min, max) {
    randomNum = 0;
    do {
        randomNum = getRandomInt(min, max)
    } while (isRight(NotAllow.get(randomNum.toString())))
    return randomNum;
}

function getRandomIndex(user) {
    if (Math.random() < SEND_KNOWN_WORD_CHANCE) {
        const haveKnownWords = user.BiggestKnowWord !== -1;
        if (haveKnownWords) {
            console.log('ask known word');
            return genRandomIndex(new Map(), 0, user.BiggestKnowWord);
        }
    }

    console.log('ask unknon word');
    return genRandomIndex(
        user.knowWords,
        user.BiggestKnowWord + 1,
        Math.min(user.BiggestKnowWord + 1 + MAX_RANGE_WORDS, MAX_WORDS));
}

router.get('/rand', validation, async (req, res) => {
    const id = req.user._id
    const user = await User.findById({ "_id": id });

    // random chance of send known word
    if (user.lastAnswer != -1)
        user.knowWords.set(user.lastAnswer.toString(), true);  // don't send one after another the same word'

    const wordIndex = getRandomIndex(user);

    user.lastAsk = wordIndex;

    console.log('index:' + wordIndex);
    const word = await Word.findOne({ index: wordIndex });

    User.findByIdAndUpdate({ "_id": id }, { "lastAsk": user.lastAsk, "lastAnswer": user.lastAsk }, function (err, result) {

        if (err) {
            res.send(err)
        }
        else {
            if (word == null) {
                console.log('NULLLLL');
            }
            else {

                res.send(word.text);
            }
        }

    })

})

function updateKnownWords(user) {
    if (user.lastAsk === user.BiggestKnowWord + 1) {
        user.BiggestKnowWord = user.lastAsk;

        // update known words until we reach the last (or biggest index word) known word
        nextWord = user.knowWords.get((user.BiggestKnowWord + 1).toString());
        while (isRight(nextWord)) {
            user.BiggestKnowWord++;
            nextWord = user.knowWords.get((user.BiggestKnowWord + 1).toString());
        }
    }
}

function isKnownWord(user) {
    rightCount = 0;
    const answerList = user.answers.get(user.lastAsk.toString());
    for (var i = 0; i < answerList.length; i++) {
        if (answerList[i].isRight) {
            rightCount++;
        }
    }

    if (rightCount >= WHEN_USER_KNOW_WORD) {
        user.knowWords.set(user.lastAsk.toString(), true);
        return true;
    }
    else if (user.knowWords.get(user.lastAsk.toString()) !== undefined) {
        user.knowWords.set(user.lastAsk.toString(), false);
        if (user.lastAsk < user.BiggestKnowWord) {
            user.BiggestKnowWord = user.lastAsk - 1;
        }
    }

    return false;
}

function InsetAnswer(user, isRight) {
    answers = user.answers.get(user.lastAsk.toString());

    // init list
    if (answers === undefined) {
        answers = [];
    }

    answers.push({ isRight });

    if (answers.size > WHEN_USER_KNOW_WORD)
        answers.shift();  // max size

    user.answers.set(user.lastAsk.toString(), answers);
}

router.post('/answer', validation, async (req, res) => {
    const id = req.user._id
    const user = await User.findById({ "_id": id });

    if (user.lastAsk === -1) {
        return res.status(400).send('place ask for the word before answer')
    }

    InsetAnswer(user, req.body.isRight)

    if (isKnownWord(user)) {
        updateKnownWords(user);
    }

    user.lastAnswer = user.lastAsk;
    user.lastAsk = -1;

    User.findByIdAndUpdate({ "_id": id },
        {
            "answers": user.answers,
            "lastAsk": user.lastAsk,
            "knowWords": user.knowWords,
            "BiggestKnowWord": user.BiggestKnowWord,
            "lastAnswer": user.lastAnswer,
        },
        function (err, result) {

            if (err) {
                res.send({ isOk: false })
            }
            else {
                res.send({ isOk: true })
            }

        })
})

module.exports = router;