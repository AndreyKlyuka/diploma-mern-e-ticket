const randomString = require('randomstring')

const { Router } = require('express')
const Event = require('../models/Event')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const Tickets = require('../models/Tickets')

const router = Router()

//create new event

router.post('/create-event', auth, async (req, res) => {
    try {
        const { eventInfo } = req.body

        const link = eventInfo.eventName.replace(/\s/g, '-')
        const existing = await Event.findOne({ link })

        if (existing) {
            return res.json({ event: existing })
        }

        const event = new Event({
            creator: req.user.userId,
            link,
            tickets: '',
            description: {
                eventName: eventInfo.eventName,
                date: eventInfo.date,
                time: eventInfo.time,
                location: eventInfo.location,
                about: eventInfo.about,
                price: eventInfo.price,
            },
            hasHall: eventInfo.hasHall,
            width: eventInfo.width,
            seats: eventInfo.seats,
        })

        const ticketsSet = new Set()
        let seatCounter = event.seats
        while (ticketsSet.size < eventInfo.seats) {
            seatCounter -= 1

            ticketsSet.add(
                `${event.seats - seatCounter}-` + randomString.generate(14)
            )
        }

        const tickets = new Tickets({
            event: event._id,
            uniqueCode: [...ticketsSet],
        })

        await tickets.save()

        event.tickets = tickets._id

        await event.save()

        const currentUser = await User.findByIdAndUpdate(req.user.userId, {
            $push: { createdEvents: event._id },
        })

        await currentUser.save()

        res.status(201).json({ event })
    } catch (e) {
        res.status(500).json({ e })
    }
})

router.post('/buy-ticket/:id', auth, async (req, res) => {
    try {
        const ticketInfo = req.body.hallMapArr
        const ticketSelected = []

        const ticket = await Tickets.findOne({
            _id: req.params.id,
        })
        // console.log(ticket)

        let ticketNum = 0
        let firstRow = 0
        let secondRow = 0

        for (let i = 0; i < ticketInfo.length; i++) {
            //количество рядов
            for (let j = 0; j < ticketInfo[i].length; j++) {
                //количество месят в ряду
                if (i === 0) firstRow = ticketInfo[i].length
                if (i === 1) secondRow = ticketInfo[i].length
                ticketNum = ticketInfo[i].length * i + 1 + j
                if (i > 0) ticketNum -= secondRow - firstRow
                if (ticketInfo[i][j].state === 'taken') {
                    ticketSelected.push(
                        ticket.uniqueCode[ticketNum - 1].split('-')[1] ||
                            ticket.uniqueCode[ticketNum - 1]
                    )

                    if (ticket.uniqueCode[ticketNum - 1].indexOf('-') > -1)
                        ticket.uniqueCode[ticketNum - 1] =
                            ticket.uniqueCode[ticketNum - 1].split('-')[1]
                }
            }
        }
        await ticket.save()

        let uniqueTickets = [...new Set(ticketSelected)]

        const currentUser = await User.findByIdAndUpdate(req.user.userId, {
            tickets: uniqueTickets,
        })

        await currentUser.save()

        // console.log(uniqueTickets)

        res.json(ticket)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

router.get('/show-ticket/:id', auth, async (req, res) => {
    try {
        const ticket = await Tickets.findOne({
            _id: req.params.id,
        })
        res.json(ticket)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

router.get('/show-tickets', auth, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user.userId,
        })

        res.json(user.tickets)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

// get all events CREATER BY  USER

router.get('/my-events', auth, async (req, res) => {
    try {
        const events = await Event.find({ creator: req.user.userId })
        res.json(events)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

//get all events

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({})
        res.json(events)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

//get event by id

router.get('/:link', async (req, res) => {
    try {
        const event = await Event.findOne({ link: req.params.link })
        res.json(event)
    } catch (e) {
        res.status(500).json({ messsage: 'Что-то пошло не так' })
    }
})

module.exports = router
