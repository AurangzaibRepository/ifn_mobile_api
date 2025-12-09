module.exports = (app) => {
    require('./donation.routes')(app);
    require('./event.routes')(app);
    require('./member.routes')(app);
}