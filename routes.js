// routes.js
require('dotenv').config();
const express = require('express');
const uuid = require('uuid');

const MessMenu = require('./models');
const BusSchedule = require('./busmodel');
const Event = require('./eventmodel');
const Outlet = require('./outletmodel');

const router = express.Router();


// Create a new Mess Menu item
router.post('/mess-menu', async (req, res) => {
  
   /*#swagger.tags = ['Mess Menu'] 
   #swagger.security = [{
            "apiKeyAuth": []
    }] */
  try {
    const newMenuItem = await MessMenu.create(req.body);
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create Mess Menu item' });
  }
});

// Get all Mess Menu items
router.get('/mess-menu', async (req, res) => {
  // #swagger.tags = ['Mess Menu']
  try {
    const menuData = await MessMenu.findOne();

    if (!menuData) {
      return res.status(404).json({ message: 'Mess Menu data not found' });
    }

    res.json(menuData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a Mess Menu item by ID
router.get('/mess-menu/:id', async (req, res) => {
  // #swagger.tags = ['Mess Menu']
  const { id } = req.params;
  try {
    const menuItem = await MessMenu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Mess Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update a Mess Menu item by ID
router.put('/mess-menu/:id', async (req, res) => {
  // #swagger.tags = ['Mess Menu']
  const { id } = req.params;
  const mess = req.body;
  console.log(mess);
  try {
    let menuItem = await MessMenu.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Mess Menu item not found' });
    }

    menuItem.mess = mess;

    menuItem = await menuItem.save();

    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a Mess Menu item by ID
router.delete('/mess-menu/:id', async (req, res) => {
  // #swagger.tags = ['Mess Menu']
  const { id } = req.params;
  try {
    const deletedMenuItem = await MessMenu.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Mess Menu item not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//BUSES


// Route for fetching all bus schedules
router.get('/buses', async (req, res) => {
  // #swagger.tags = ['Buses']
  try {
    const busSchedules = await BusSchedule.find();
    res.json(busSchedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for creating a new bus schedule
router.post('/buses', async (req, res) => {
  // #swagger.tags = ['Buses']

  try {
    const busSchedule = new BusSchedule(req.body);
    console.log(busSchedule);
    await busSchedule.save();
    res.status(201).json(busSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for geting all towns/stops
router.get('/towns', async (req, res) => {
  // #swagger.tags = ['Buses']

  try {
    const sources = await BusSchedule.distinct('Source');
    const destinations = await BusSchedule.distinct('Destination');
    const names = [...new Set([...sources, ...destinations])].map(name => ({ name }));
    res.json(names);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for searching buses from source to destination
router.get('/search', async (req, res) => {
  // #swagger.tags = ['Buses']
  const { source, destination } = req.query;

  try {
    const buses = await BusSchedule.find({ Source: source, Destination: destination });

    if (buses.length === 0) {
      return res.status(404).json({ message: 'No buses found for the given source and destination' });
    }

    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Event API
router.get('/events', async (req, res) => {
  // #swagger.tags = ['Events']

  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/events/:id', async (req, res) => {
  // #swagger.tags = ['Events']

  const { id } = req.params;
  try {
    const eventData = await Event.findById(id);
    if (!eventData) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(eventData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST Event API
router.post('/events', async (req, res) => {
  // #swagger.tags = ['Events']

  const event = new Event({
    event_name: req.body.event_name,
    location: req.body.location,
    date: req.body.date,
    start_time: req.body.start_time,
    poster_image_url: req.body.poster_image_url,
    description: req.body.description,
    added_by: req.body.added_by
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PUT Event API
router.put('/events/:eventid', async (req, res) => {
  // #swagger.tags = ['Events']

  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.event_name = req.body.event_name;
    event.location = req.body.location;
    event.date = req.body.date;
    event.start_time = req.body.start_time;
    event.poster_image_url = req.body.poster_image_url;
    event.description = req.body.description;
    event.added_by = req.body.added_by;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


///// FOR OUTLETS


router.get('/outlets', async (req, res) => {
  // #swagger.tags = ['Outlets']

  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/outlets/:id', async (req, res) => {
  // #swagger.tags = ['Outlets']

  const { id } = req.params;
  try {
    const outletData = await Outlet.findById(id);
    if (!outletData) {
      return res.status(404).json({ message: 'Outlet not found' });
    }
    res.json(outletData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/outlets', async (req, res) => {
  // #swagger.tags = ['Outlets']

  const outlet = new Outlet({
    name: req.body.name,
    location: req.body.location,
    landmark: req.body.landmark,
    open_time: req.body.open_time,
    close_time: req.body.close_time,
    rating: req.body.rating,
    menu: req.body.menu,
    image: req.body.image
  });

  try {
    const newOutlet = await outlet.save();
    res.status(201).json(newOutlet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an outlet
router.patch('/outlets/:id', getOutlet, async (req, res) => {
  // #swagger.tags = ['Outlets']

  if (req.body.name != null) {
    res.outlet.name = req.body.name;
  }
  if (req.body.location != null) {
    res.outlet.location = req.body.location;
  }
  if (req.body.landmark != null) {
    res.outlet.landmark = req.body.landmark;
  }
  if (req.body.open_time != null) {
    res.outlet.open_time = req.body.open_time;
  }
  if (req.body.close_time != null) {
    res.outlet.close_time = req.body.close_time;
  }
  if (req.body.rating != null) {
    res.outlet.rating = req.body.rating;
  }
  if (req.body.menu != null) {
    res.outlet.menu = req.body.menu;
  }
  if (req.body.image != null) {
    res.outlet.image = req.body.image;
  }
  try {
    const updatedOutlet = await res.outlet.save();
    res.json(updatedOutlet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an outlet
router.delete('/outlets/:id', getOutlet, async (req, res) => {
   /* #swagger.tags = ['Outlets']
   #swagger.security = [{
            "apiKeyAuth": ['X-API-KEY']
    }] */

  try {
    await res.outlet.findByIdAndDelete();
    res.json({ message: 'Outlet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/outlets/menu/:outletId', async (req, res) => {
  // #swagger.tags = ['Outlets']

  const { outletId } = req.params;

  try {
    const outlet = await Outlet.findById(outletId);

    if (!outlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    const menuItems = outlet.menu.map(item => ({
      name: item.name,
      price: item.price
    }));

    // Return menu items
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware function to get outlet by ID
async function getOutlet(req, res, next) {
  try {
    outlet = await Outlet.findById(req.params.id);
    if (outlet == null) {
      return res.status(404).json({ message: 'Outlet not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.outlet = outlet;
  next();
}


module.exports = router;
