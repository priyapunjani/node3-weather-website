const path = require('path')
const express = require('express')
const hbs = require('hbs') //to use partial directories
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
//Define path for Express Config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partial')

//console.log(viewsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //to regiter partial path we have created
//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Page',
        name: 'Andrew Mead'
    })
})

app.get('/help' , (req,res) => {
    res.render('help', {
        title : 'Help Page',
        name: 'Andrew Mead'
    })
})
//console.log(__dirname)
//console.log(__filename)


app.get('/help', (req,res) =>{
    res.send({                                      //passing json data
        name : 'Andrew',
        age:23
    })
})
app.get('/array1', (req,res) =>{
    res.send([{                                      //passing json data in array
        name : 'Andrew',
    },
    {
        name : 'sara'
    }])
})
app.get('/aboutus', (req,res) =>{
    res.send('About Us Page')
})
app.get('/weather', (req,res) =>{
    if(!req.query.address){
       return res.send({
            error:'You must need to provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,place} = {} ) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude, (error,forecastData) =>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecast:forecastData,
                place,
                address: req.query.address
            })
        })

    })
    //res.send({
      //      forecast : 'It is snowing',
     //   location : 'Philadelphia',
      //      address: req.query.address
    //})
})
//path >app.js -e js,hbs => when shows error about server already in use
app.get('/products',(req,res) => {
    //to get element we passed in url like: http://localhost:3000/products?search=games&ratings=5
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term.'
        })   
    }
    console.log(req.query.search) 
    res.send({
        products: []
    })
})

//app.com
//app.com/aboutus

//when we try some differnt path as ex. help/data which does not exist.
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Andrew',
        errormsg: 'Help Article Not Found'
    })
})
//for page which is not created to show 404 massage
app.get('*' , (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andrew',
        errormsg:'Page Not Found'
        
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})