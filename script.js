const basepath = "./cardimg/cardimg/";
var cardset = new Set(); //중복제거

window.onload = function () {

    cardPath();
    random();
    flip();


    //1.배열 초기화
    //2.카드 보여주기
    //3.카드에 이번트 등록
}

//파일에 잇는 51장의 카드를 배열에 담아 줌
function cardPath() {
    // 1부터 51까지의 숫자를 가진 파일명을 배열에 추가
    for (let i = 0; i < 51; i++) {
        let num = (Math.random() * 51).toFixed(0);
        cardset.add(num);

        if (cardset.size === 10) {
            break;
        }
    }

    selectedcard = Array.from(cardset);

}
let selectedcard = [];
let cardcount = 10;
let randomcard = 0;
function random() {

    selectedcard = selectedcard.concat(selectedcard);   //selectedcard에 selectedcard를 더함
    selectedcard.sort(() => Math.random() - 0.5);   //정렬

}

//시작하면 다 보여주고 뒤집는다
function start() {
    allshow(); // 모든 카드를 보이게 함
    setTimeout(function () {
        allflip(); // 10초 후에 모든 카드를 다시 뒤집음
    }, 10000);
}


//모든카드 뒤집기
function allshow() {
    var cards = document.getElementsByClassName("card"); // 모든 카드 요소를 가져옴
    for (let i = 0; i < cards.length; i++) {
        cards[i].src = basepath + selectedcard[i] + ".png";
    }
}


// 전체뒤집기
function allflip() {
    var cards = document.getElementsByClassName("card"); // 모든 카드 요소를 가져옴
    for (let i = 0; i < cards.length; i++) {
        // 카드를 다시 뒷면으로 돌림
        cards[i].src = basepath + "back.png";
    }
}

document.getElementById('allshow').onclick = function () {
    allshow();
    setTimeout(allflip, 5000); // 5초 후에 모든 카드를 다시 뒤집음
};


//  function flip()


let firstcard = null; // 첫번째 카드 저장하는 변수
let successgame = 0;
//한장 뒤집기
// 뒤집힌 카드를 앞으로 뒤집는 함수
// arr에 담긴 카드를 가져와서 사용자가 선택한 카드를 보여준다
function flip() {
    var card = document.getElementsByClassName("card");

    for (let i = 0; i < card.length; i++) {
        card[i].onclick = function () {
            if (!isFront(card[i])) {
                card[i].src = basepath + selectedcard[i] + ".png";

                if (firstcard === null) {
                    // 첫 번째 카드를 선택한 경우
                    firstcard = { element: card[i], index: i };

               //return     //끊어서 중첩을 최소화할것

                } else {
                    // 두 번째 카드를 선택한 경우
                    if (selectedcard[firstcard.index] === selectedcard[i]) {
                        // 두 카드의 이미지가 일치하는 경우
                        firstcard = null; // 선택 정보 초기화
                        successgame++;
                        if (successgame === selectedcard.length / 2) {
                            // 모든 쌍이 일치하는 경우 게임 종료
                            setTimeout(function () {        //직접 넣지말고 함수를 따로 만들기
                                alert("모든 카드를 찾았습니다!");
                            }, 100);
                            resetGame();
                        } else {
                            setTimeout(function () {
                                alert("정답입니다")
                            }, 100);
                        }

                    } else {
                        setTimeout(function () {
                            alert("틀렸습니다")
                        }, 100);
                        // 두 카드의 이미지가 일치하지 않는 경우
                        setTimeout(function () {
                            // 1초 후에 선택한 카드를 다시 뒤집음
                            card[i].src = basepath + "back.png";
                            firstcard.element.src = basepath + "back.png";
                            firstcard = null; // 선택 정보 초기화
                        }, 1000);
                    }
                }
            }
        }
    }
}


function resetgame() {
    // 모든 카드를 다시 뒷면으로 돌림
    allflip();
    // 새로운 카드 세트를 생성하여 게임을 재시작함
    cardPath();
    random();
}


// 카드가 앞면이면 true, 아니면 false
function isFront(card) {
    return false;
}

function cardClick(card) {
    //1.카드가 앞면인지 확인. 앞면이면 return
    if (isFron(card)) return;

    //2.카드를 뒤집는다.
    flip(card);

    //3.두번째 카드면, 첫번째 카드와 비교
    //  첫번째 카드면 비교할 필요가 없다.(return)
}
