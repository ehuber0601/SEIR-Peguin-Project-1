//**************** */
// APP STATE
//**************** */

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true
}

let questions = []

//***************** */
//Main DOM Element
//***************** */

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

//***************** */
// Functions
//***************** */

const chooseAnswer = (event, question) => {
    console.log(event)
    if(event.target.innerText === question.answer){
        console.log("correct")
        if (state.which){
            state.player1++
            state.which = !state.which
        }else{
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else {
        console.log("incorrect")
        setBoard(questions)
        state.which = !state.which
    }
}


const setBoard = (q) => {
    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
   
    // Update question
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    //update players score
    $p1score.text(state.player1) 
    $p2score.text(state.player2)

    $("li").off()
    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion)
    })
}

console.log($p2score, $p1score)

const URL = "https://cdn.contentful.com/spaces/9p4e6o6yd4hi/environments/master/entries?access_token=e7k7n2Ujl6iLUNogMuTb4wdT0I2UH9j845C6MDf29DA&content_type=triviaQ"
        $.ajax(URL)
        .then((data) => {
            questions = data.items.map((q) => q.fields)
            console.log(data)
            console.log(questions)

            setBoard(questions)
        })