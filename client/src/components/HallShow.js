import React from 'react'
import { useEffect } from 'react'

export const HallShow = (eventInfo) => {
    useEffect(() => {
        const hall = document.getElementById('hall')

        let row = [] // array which fill hall
        let hallMapArr = [] // 3dimension array of whole hall

        let rowCount = Math.floor(eventInfo.seats / eventInfo.width)
        if (eventInfo.width === 0) return 1
        if (eventInfo.seats % eventInfo.width !== 0) {
            let rowRemainder = eventInfo.seats % eventInfo.width
            row.push(rowRemainder)
        }

        for (let i = 0; i < rowCount; i++) {
            row.push(eventInfo.width)
        }

        function fillHall() {
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
                        row: index + 1,
                        seat: i,
                        state: 'free',
                        price: 5,
                    })
                }

                hallMap += '<div class="row">' + hallRow + '</div>'
                hallMapArr.push(hallRowArr)
            })

            hall.innerHTML = hallMap //заполнение блока hall
        }

        fillHall()
    })

    return (
        <>
            <div id="hall" className="hall_seats"></div>
        </>
    )
}
