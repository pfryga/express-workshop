var getSongs = require('./getSongs');

module.exports = {
    chat: function(req, res) {
        res.render('chat', {
            user: 'pfryga'
        });
    },
    songs: function(req, res) {
        console.log(req.params);
        getSongs(req.params.q).done(function(songs) {
            res.json(songs);
        });
    }
}
