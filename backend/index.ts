// I believe that due to just 2 requests I shouldnt have setup routing.
import express from 'express'
import cors from 'cors'

const app = new express()

app.use(cors())
app.get('/api/products/get', async(req, res) => {
    
})
app.get('/api/admin/get', async(req, res) => {
    
})
// This next post request that has been commented was used to make products because i was too lazy to manually enter data on the slow mongodb site
app.post('/api/products/post', async(req,res) => {

})

app.use(8080, () => {
    console.log('App listening on Port 8080')
})