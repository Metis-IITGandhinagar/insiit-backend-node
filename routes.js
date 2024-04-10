// routes.js
require('dotenv').config();
const express = require('express');
const uuid = require('uuid');

const MessMenu = require('./models');
const BusSchedule = require('./busmodel');
const Event = require('./eventmodel');
const Outlet = require('./outletmodel');
const StudentBody = require('./representmodel');

const router = express.Router();


const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY || apiKey === '') {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key. Congtact metis@iitgn.ac.in to get one.' });
  }
  next();
};


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

// Create a new Mess Menu item
router.post('/mess-menu', checkApiKey, async (req, res) => {

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
router.put('/mess-menu/:id', checkApiKey, async (req, res) => {
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
router.delete('/mess-menu/:id', checkApiKey, async (req, res) => {
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

// get by id
router.get('/buses/:id', async (req, res) => {
  // #swagger.tags = ['Buses']
  const { id } = req.params;
  try {
    const bus = await BusSchedule.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for creating a new bus schedule
router.post('/buses', checkApiKey, async (req, res) => {
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

// route for updating bus schedule
router.put('/buses/:id', checkApiKey, async (req, res) => {
  // #swagger.tags = ['Buses']

  try {
    const bus = await BusSchedule.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Event not found' });
    }

    bus.BusName = req.body.BusName;
    bus.DepartureTime = req.body.DepartureTime;
    bus.Destination = req.body.Destination;
    bus.Source = req.body.Source;
    bus.Stops = req.body.Stops;

    const updatedBus = await bus.save();
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/buses/:id', checkApiKey, async (req, res) => {
  /* #swagger.tags = ['Buses'] */
  const { id } = req.params;
  console.log(id);
  try {
    // Find outlet by ID and delete it
    const deletedBus = await BusSchedule.findByIdAndDelete(id);
    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting outlet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO: Add route for deleting bus schedule



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

//EVENTS API

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

// New Event
router.post('/events', checkApiKey, async (req, res) => {
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


// Edit Event API
router.put('/events/:eventid', checkApiKey, async (req, res) => {
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

//route for deleting event
router.delete('/events/:id', checkApiKey, async (req, res) => {
  /* #swagger.tags = ['Events'] */
  const { id } = req.params;
  console.log(id);
  try {
    // Find event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
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

router.post('/outlets', checkApiKey, async (req, res) => {
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
router.patch('/outlets/:id', getOutlet, checkApiKey, async (req, res) => {
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

// Update an outlet Menu
router.patch('/api/outlets/:outletId', checkApiKey, async (req, res) => {
  const { outletId } = req.params;
  console.log(outletId);
  const { menu } = req.body;


  try {
    const updatedOutlet = await Outlet.findByIdAndUpdate(outletId, { menu }, { new: true });
    if (!updatedOutlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }

    res.json({ message: 'Menu updated successfully', outlet: updatedOutlet });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/outlet/:outletId', checkApiKey, async (req, res) => {
  /* #swagger.tags = ['Outlets'] */
  const { outletId } = req.params;
  console.log(outletId);
  try {
    // Find outlet by ID and delete it
    const deletedOutlet = await Outlet.findByIdAndDelete(outletId);
    if (!deletedOutlet) {
      return res.status(404).json({ error: 'Outlet not found' });
    }
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting outlet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get menu items of an outlet
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

// Middleware function
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


// Representatives
router.get('/representatives', async (req, res) => {
  // #swagger.tags = ['Representatives']

  try {
    const representatives = await StudentBody.find();
    res.json(representatives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
