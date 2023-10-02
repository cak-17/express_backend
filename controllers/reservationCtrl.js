const Reservation = require('../models/Reservation')

getAll = async (req, res) => {
    await Reservation.find()
    .then(reservation => {
        return res.status(200).json({
            success: true,
            data: reservation,
        })
    })
    .catch(err => res.status(400).json({
        success: false,
        message: 'Reservation not found'
    }))
}

checkAvailability = async (req, res) => {
    const body = req.body
    const conflictinfReservations = await Reservation.find()
        .where('category.slug', req.params.categorySlug)
}

book = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success:false,
            message: 'All fields are required'
        })
    }

    const reservation = new Reservation(body)

    if (!reservation) {
        return res.status(400).json({
            success: false,
            message: "Reservation couldn't be processed"
        })
    }


    // add booking logic

    reservation.save()
        .then(reserv => {
            return res.status(200).json({
                success: true,
                data: {
                    id: reserv._id,
                    status: reserv.status,
                },
                message: 'Reservation was submitted correctly'
            })
        })
}

module.exports = {
    book,
    getAll
}