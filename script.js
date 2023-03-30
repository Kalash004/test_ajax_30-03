const ENDPOIT = "https://dog-api.kinduff.com/";
const DOG_FACTS = "api/facts";
let used_facts = [];
let current_fact;

$(document).ready(() => {
    let liked = new Liked_facts();
    let disliked = new Disliked_facts();
    $("#show-liked").hide();
    $("#show-disliked").hide();

    $("#get-liked").click(() => {
        $("#show-liked").show();
    })

    $("#get-disliked").click(() => {
        $("#show-disliked").show();
    })

    $("#like").click((e) => {
        $("#dog-fact-text").toggle("slow").text("");
        liked.putFact(current_fact);
        $("#show-liked").html($("#show-liked").text()+ "<br>" +current_fact.fact)
    });
    $("#dislike").click((e) => {
        $("#dog-fact-text").toggle("slow").text("");
        disliked.putFact(current_fact);
        $("#show-disliked").html($("#show-disliked").text()+ "<br>" +current_fact.fact)
    });
    $("#get-new").click((e) => {
        $("#dog-fact-text").toggle("slow").text("");
        GenerateDogFact(ENDPOIT + DOG_FACTS, "GET");
        $("#dog-fact-text").show();
    });


    console.log("test");
    GenerateDogFact(ENDPOIT + DOG_FACTS, "GET");
})



class A_fact {
    constructor(fact) {
        this.fact = fact;
    }
}

class Liked_facts {
    constructor() {
        this.liked_facts = []
    }

    putFact(fact) {
        this.liked_facts.push();
        console.log("liked a fact \"" + fact.fact+ "\"");
    }
}

class Disliked_facts {
    constructor() {
        this.disliked_facts = []
    }

    putFact(fact) {
        this.disliked_facts.push();
        console.log("disliked a fact \"" + fact.fact+ "\"");
    }
}

function GetData(url, method, testtime, data) {
    $.ajax({
        url: url,
        type: method,
        headers: {},
        if(data) {
            data: data;
        },
        success: function (data, status) { WriteFact(url, method, data, testtime); console.log(data); },
        error: function (data, status) { console.log(data) }
    });
}


function GenerateDogFact(url, method, testtimes) {
    GetData(url, method, testtimes);
}



function WriteFact(url, method, data, testtimes) {
    const fact = data.facts[0]
    if (testtimes > 5) {
        alert("No new facts");
        return;
    }
    testtimes++;
    console.log(testtimes);
    used_facts.forEach(element => {
        if (element == fact) {
            GenerateDogFact(url, method, testtimes);
        }
    });
    used_facts.push(fact);
    current_fact = new A_fact(fact);
    $("#dog-fact-text").html(fact);
}
