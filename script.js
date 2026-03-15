let room1 = document.querySelector(".room1")
let room2 = document.querySelector(".room2")
let room3 = document.querySelector(".room3")
let room4 = document.querySelector(".room4")

room1.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none"
    document.getElementsByClassName("roomInside")[0].style.display = "flex"
    document.getElementsByClassName("roomInside")[1].style.display = "none"
    document.getElementsByClassName("roomInside")[2].style.display = "none"
    document.getElementsByClassName("roomInside")[3].style.display = "none"
}) // to open room 1 when it is clicked

room2.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none"
    document.getElementsByClassName("roomInside")[1].style.display = "flex"
    document.getElementsByClassName("roomInside")[0].style.display = "none"
    document.getElementsByClassName("roomInside")[2].style.display = "none"
    document.getElementsByClassName("roomInside")[3].style.display = "none"
}) // to open room 2 when it is clicked

room3.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none"
    document.getElementsByClassName("roomInside")[2].style.display = "flex"
    document.getElementsByClassName("roomInside")[1].style.display = "none"
    document.getElementsByClassName("roomInside")[0].style.display = "none"
    document.getElementsByClassName("roomInside")[3].style.display = "none"
}) // to open room 3 when it is clicked

room4.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none"
    document.getElementsByClassName("roomInside")[3].style.display = "flex"
    document.getElementsByClassName("roomInside")[1].style.display = "none"
    document.getElementsByClassName("roomInside")[2].style.display = "none"
    document.getElementsByClassName("roomInside")[0].style.display = "none"
}) // to open room 4 when it is clicked

for (let i = 0; i < 4; i++) {

    document.getElementsByClassName("back")[i].addEventListener("click", () => {
        document.getElementsByClassName("roomInside")[i].style.display = "none"
        document.querySelector(".container").style.display = "flex"
    }) // Back Button EventListener

    document.getElementsByClassName("roomInside")[i].style.display = "none" // Initially all rooms should not be shown

    let name = document.getElementsByClassName("room_name")[i].innerHTML // Room Name

    let time_list1 = document.getElementsByClassName("time_list")[i].getElementsByTagName('li')
    let seat_list1 = document.getElementsByClassName("seat_list")[i].getElementsByTagName('li')

    for (let list of time_list1) {
        for (let seat of seat_list1) {
            let seat_name = seat.innerHTML // seat name
            let time_name = list.innerHTML // timing
            if (localStorage.getItem(`${name}${seat_name}${time_name}`) == null) {
                localStorage.setItem(`${name}${seat_name}${time_name}`, "yes") // Setting all the seat initially to empty in local storage
            }
        }
    }

    let time_select = time_list1[0];
    let seat_select = seat_list1[0];

    document.getElementsByClassName('confirm')[i].style.display = "none";

    time_select.classList.add("select"); // initially the 8 - 9 time should be selected

    for (let seats of seat_list1) {
        if (localStorage.getItem(`${name}${seats.innerHTML}${time_select.innerHTML}`) == 'no') {
            seats.style.backgroundColor = "rgb(226, 117, 117)"
        } else {
            seats.style.backgroundColor = "rgba(75, 172, 210, 0.66)"
        }
    } // initially the previously selected should be shown

    for (let value of time_list1) {
        value.addEventListener("click", () => {
            time_select.classList.remove("select") // to deselect the previously selected time
            value.classList.add("select"); // to select newly selected time
            time_select = value;
            seat_select.classList.remove("select") // to deselect the seat previously selected when new timing in selected
            document.getElementsByClassName('confirm')[i].style.display = "none";
            for (let seats of seat_list1) {
                if (localStorage.getItem(`${name}${seats.innerHTML}${time_select.innerHTML}`) == 'no') {
                    seats.style.backgroundColor = "rgb(226, 117, 117)"
                } else {
                    seats.style.backgroundColor = "rgba(75, 172, 210, 0.66)"
                }
            } // to show all the booked seats in the newly selected timing
        })

        for (let seats of seat_list1) {
            seats.addEventListener("click", () => {
                seat_select.classList.remove("select") // to deselect the previously selected seat
                seats.classList.add("select") //to select the newly selected seat
                seat_select = seats;
                document.getElementsByClassName('text')[i].innerHTML = "";

                if (localStorage.getItem(`${name}${seats.innerHTML}${time_select.innerHTML}`) == 'no') {
                    document.getElementsByClassName('text')[i].innerHTML = `${seat_select.innerHTML} from ${time_select.innerHTML} in ${name} is already occupied.`;
                    document.getElementsByClassName('confirm')[i].style.display = "revert";
                    document.getElementsByClassName('button')[i].style.display = "none"
                } // text when seat is already booked
                else {
                    document.getElementsByClassName('button')[i].style.display = "flex"
                    document.getElementsByClassName('text')[i].innerHTML = `Are you sure you want ${seat_select.innerHTML} from ${time_select.innerHTML} in ${name}.`;
                    document.getElementsByClassName('confirm')[i].style.display = "revert";
                } // text when seat is not booked

                document.getElementsByClassName('button')[i].addEventListener("click", () => {
                    localStorage.setItem(`${name}${seat_select.innerHTML}${time_select.innerHTML}`, "no")
                    seat_select.style.backgroundColor = "rgb(226, 117, 117)"
                    document.getElementsByClassName('text')[i].innerHTML = `${seat_select.innerHTML} from ${time_select.innerHTML} in ${name} is already occupied.`;
                    document.getElementsByClassName('confirm')[i].style.display = "revert";
                    document.getElementsByClassName('button')[i].style.display = "none"
                }) // if yes if clicked then the text should be changed and the seat should be occupied
            })
        }

    }
}