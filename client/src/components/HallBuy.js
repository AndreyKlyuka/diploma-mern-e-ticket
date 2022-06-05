import React, { useEffect, useContext, useCallback, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

import { useHttp } from '../hooks/http.hook'

export const HallBuy = (eventInfo) => {
    const event = eventInfo.event
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [tickets, setTickets] = useState()

    const buyHandler = useCallback(
        async (hallMapArr) => {
            try {
                await request(
                    `/api/event/buy-ticket/${event.tickets}`,
                    'POST',
                    { hallMapArr },
                    { Authorization: `Bearer ${auth.token}` }
                )
            } catch (e) {}
        },
        [request, auth, event]
    )

    const showHadler = useCallback(async () => {
        try {
            const fetched = await request(
                `/api/event/show-ticket/${event.tickets}`,
                'GET',
                null,
                { Authorization: `Bearer ${auth.token}` }
            )

            setTickets(fetched)
        } catch (error) {}
    }, [request, auth, event])

    useEffect(() => {
        showHadler()
    }, [showHadler])

    useEffect(() => {
        const hall = document.getElementById('hall')
        const seats = document.getElementsByClassName('seat')
        const selectedSeatContainer = document.querySelector('.film-info__seat')

        let row = [] // array which fill hall
        let hallMapArr = [] // 3dimension array of whole hall
        let selectedSeatsArr = [] // save all selected seat
        let totalCost = 0 // total price for selected seats

        // let hallWidth = +width
        let rowCount = Math.floor(event.seats / event.width)
        if (event.width === 0) return 1
        if (event.seats % event.width !== 0) {
            let rowRemainder = event.seats % event.width
            row.push(rowRemainder)
        }

        for (let i = 0; i < rowCount; i++) {
            row.push(event.width)
        }
        function fillHall(hallTickets) {
            let hallMap = '' // seats map
            row.forEach(function (el, index) {
                let hallRow = ''
                let hallRowArr = []

                for (let i = 1; i <= el; i++) {
                    hallRow +=
                        '<div class="seat hall-info__legend-color_free" data-row="' +
                        (index + 1) +
                        '" data-seat="' +
                        i +
                        '">&nbsp;</div>'

                    hallRowArr.push({
                        ticketNum:
                            index > 0
                                ? row[index] * index + i - (row[1] - row[0])
                                : row[index] * index + i,
                        row: index + 1,
                        seat: i,
                        state: 'free',
                        price: event.description.price,
                    })
                }

                hallMap += '<div class="row">' + hallRow + '</div>'
                hallMapArr.push(hallRowArr)
            })
            hall.innerHTML = hallMap //заполнение блока hall

            // console.log(hallMapArr)
            for (let i = 0; i < hallMapArr.length; i++) {
                for (let j = 0; j < hallMapArr[i].length; j++) {
                    // console.log(
                    //     hallTickets[hallMapArr[i][j].ticketNum - 1],
                    //     seats[hallMapArr[i][j].ticketNum - 1]
                    // )

                    if (
                        hallTickets[hallMapArr[i][j].ticketNum - 1].indexOf(
                            '-'
                        ) === -1
                    ) {
                        hallMapArr[i][j].state = 'taken'

                        seats[hallMapArr[i][j].ticketNum - 1].classList.add(
                            'hall-info__legend-color_taken'
                        )
                        seats[hallMapArr[i][j].ticketNum - 1].classList.remove(
                            'hall-info__legend-color_free'
                        )
                    }
                }
            }
            // console.log(seats[54])
            // console.log(hallMapArr)
        }

        function addSeatsToBuy() {
            // add listener for each seat

            for (let seat of seats) {
                seat.addEventListener('click', seatCallback(seat))
            }
        }

        function seatCallback(place) {
            // return callback for addSeatsToBuy();
            // this callback help :
            //      - put a parameter to the callback for listener
            //      - remove listener if seat have been taken

            const cb = function () {
                if (place.classList.contains('hall-info__legend-color_taken')) {
                    place.removeEventListener('click', cb)
                    return
                }
                seatEvent(place)
            }
            return cb
        }

        function seatEvent(place) {
            // event for addSeatsToBuy();
            // this event :
            //      - swtich classes to view state of seats
            //      - fill 'state' field in hallMapArr to current state(free or selected)
            //      - call showSelectedSeats(); and countSeatsPrice();

            let hallRowNum = place.getAttribute('data-row')
            let hallSeatNum = place.getAttribute('data-seat')

            place.classList.toggle('hall-info__legend-color_selected')
            place.classList.toggle('hall-info__legend-color_free')

            if (place.classList.contains('hall-info__legend-color_free')) {
                hallMapArr[hallRowNum - 1][hallSeatNum - 1].state = 'free'
            }

            if (place.classList.contains('hall-info__legend-color_selected')) {
                hallMapArr[hallRowNum - 1][hallSeatNum - 1].state = 'selected'
            }

            showSelectedSeats(hallRowNum, hallSeatNum)
            countSeatsPrice()
        }

        function showSelectedSeats(hallRowNum, hallSeatNum) {
            // show or hide the seat, user clicked, in the "selected seats" field at left

            let selectedSeat = document.querySelector('.film-info__seat_js')

            selectedSeatsArr.push(hallMapArr[hallRowNum - 1][hallSeatNum - 1])
            selectedSeatsArr = selectedSeatsArr.filter(
                (element) => element.state === 'selected'
            )

            if (selectedSeatsArr.length >= 6) {
                selectedSeatContainer.setAttribute(
                    'style',
                    'overflow-y: scroll;height: 420px;'
                )
            } else {
                selectedSeatContainer.setAttribute(
                    'style',
                    'overflow-y: visible;'
                )
            }

            selectedSeatContainer.innerHTML = ''

            for (let seat of selectedSeatsArr) {
                selectedSeat.children[0].children[1].children[0].innerHTML =
                    seat.row
                selectedSeat.children[0].children[0].children[0].innerHTML =
                    seat.seat
                selectedSeatContainer.innerHTML += selectedSeat.innerHTML
            }

            selectedSeatContainer.scrollTop = selectedSeatContainer.scrollHeight
        }

        function countSeatsPrice() {
            //count and show total price of selected seats

            totalCost = 0

            let finalCost = document.querySelector('.film-info__cost')

            for (let seat of selectedSeatsArr) {
                totalCost += +seat.price
            }

            if (selectedSeatsArr.length === 0) {
                totalCost = 0
            }

            finalCost.innerHTML = `${totalCost} uah`
        }

        function buySelectedSeats() {
            // add listener for buy button which
            //      - change 'state' field in hallMapArr
            //      - change class to taken
            //      - refill selectedSeatContainer, selectedSeatArr and show price

            let button = document.querySelector('.film-info__button')

            button.addEventListener('click', function () {
                for (let seat of selectedSeatsArr) {
                    seat.state = 'taken'

                    for (let seat of seats) {
                        if (
                            seat.classList.contains(
                                'hall-info__legend-color_selected'
                            )
                        ) {
                            seat.classList.remove(
                                'hall-info__legend-color_selected'
                            )
                            seat.classList.add('hall-info__legend-color_taken')
                        }
                    }
                }
                buyHandler(hallMapArr)

                selectedSeatContainer.innerHTML = ''
                selectedSeatsArr = selectedSeatsArr.filter(
                    (element) => element.state === 'selected'
                )
                countSeatsPrice()
            })
        }
        if (tickets) {
            // console.log(tickets.uniqueCode)
            fillHall(tickets.uniqueCode)
            addSeatsToBuy()
            buySelectedSeats()
        }
    }, [buyHandler, tickets, event])

    return (
        <>
            <div className="hall-wrapper">
                <div id="hall" className="hall_seats"></div>

                <div className="hall-info__saturation-line"></div>
                <div className="hall-info__legend">
                    <div className="hall-info__legend-item">
                        <div className="hall-info__legend-color hall-info__legend-color_free"></div>
                        <div className="hall-info__legend-description">
                            Free
                        </div>
                    </div>
                    <div className="hall-info__legend-item">
                        <div className="hall-info__legend-color hall-info__legend-color_selected"></div>
                        <div className="hall-info__legend-description">
                            Selected
                        </div>
                    </div>
                    <div className="hall-info__legend-item">
                        <div className="hall-info__legend-color hall-info__legend-color_taken"></div>
                        <div className="hall-info__legend-description">
                            Taken
                        </div>
                    </div>
                </div>
                <div className="film-info__seats">
                    <div className="film-info__seats-title">
                        <span>Selected seats</span>
                    </div>
                    <div className="film-info__selected-seats">
                        <div className="film-info__seat_js">
                            <div className="selected-seat">
                                <div className="selected-seat__place">
                                    <div className="selected-seat__number selected-seat__number_place">
                                        1
                                    </div>
                                    <div className="selected-seat__disc">
                                        Place
                                    </div>
                                </div>
                                <div className="selected-seat__row">
                                    <div className="selected-seat__number selected-seat__number_row">
                                        1
                                    </div>
                                    <div className="selected-seat__disc">
                                        Row
                                    </div>
                                </div>
                                <div className="selected-seat__price">
                                    <div className="selected-seat__number selected-seat__number_price">
                                        {event.description.price}
                                    </div>
                                    <div className="selected-seat__disc">
                                        Price
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="film-info__seat"></div>
                    </div>
                    <div>
                        <div className="film-info__button">
                            <div className="film-info__button-text">Select</div>
                        </div>

                        <div className="film-info__final-cost">
                            <div className="film-info__cost-title">
                                Final cost
                            </div>
                            <div className="film-info__cost">0 uah</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
