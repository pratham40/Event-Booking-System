import Event from "../models/event.model.js";

async function createEvent(req,res) {
    const { title, description, date, location, totalSeats, availableSeats } = req.body;

    if (!title || !description || !date || !location || !totalSeats || !availableSeats) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const event = await Event.create({
            title,
            description,
            date,
            location,
            totalSeats,
            availableSeats,
        })

        return res.status(201).json({
            message:"event created successfully",
            event
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}


async function getAllEvents(req, res) {
    try {
        const events = await Event.findAll();
        return res.status(200).json({
            message:"events fetched successfully",
            events
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error : error.message
        })
    }
}




async function updateEvent(req,res) {
    try {
        const {id} = req.params
        const { title, description, date, location, totalSeats, availableSeats } = req.body;

        if (!(title || description || date || location || totalSeats || availableSeats)) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const eventExist = await Event.findByPk(id);
        if (!eventExist) {
            return res.status(404).json({ message: "Event not found" });
        }

        const updateEvent = {}

        if (title) updateEvent.title = title;

        if (description) updateEvent.description = description;

        if (date) updateEvent.date = date;

        if (location) updateEvent.location=location;

        if (totalSeats) updateEvent.totalSeats = totalSeats;

        if (availableSeats) updateEvent.availableSeats = availableSeats;


        const updatedEvent = await Event.update(updateEvent,{
            where:{id}
        })

        return res.status(200).json({
            message:"Event updated successfully",
            event: updatedEvent
        })
    } catch (error) {
        return res.status(200).json({
            message:"Internal Serer errr",
            error: error.message
        })
    }
}


async function deleteEvent(req,res) {
    try {
        const { id } = req.params;

        const eventExist = await Event.findByPk(id);
        if (!eventExist) {
            return res.status(404).json({ message: "Event not found" });
        }

        await Event.destroy({
            where: { id }
        });

        return res.status(200).json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


async function getEventById(req, res) {
    
    const { id } = req.params;

    try {
        const eventExist = await Event.findByPk(id);
        if (!eventExist) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({
            message: "Event fetched successfully",
            eventExist
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getEventById
}