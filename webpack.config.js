module.exports = {
    entry  : 'app.js',
    output : {
        path     : __dirname,
        filename : 'bundle.js'
    }
    // module : {
    //     rules: [ { 
    //             test   : /.js$/,
    //             loader : 'babel-loader', exclude: /node_modules/, query:{presets:['es2015']} 
    //         }
    //     ]
    // }
};