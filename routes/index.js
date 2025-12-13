module.exports = (app) => {
    require('./auth.routes')(app);
    require('./donation.routes')(app);
    require('./event.routes')(app);
    require('./member.routes')(app);
    require('./blog.routes')(app);
}