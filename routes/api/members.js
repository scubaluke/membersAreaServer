const express = require('express');
const router = express.Router()
const members = require('../../Members');
const uuid = require('uuid');

// gets all  members
router.get('/', (req, res) => {
    res.json(members)
})

//get single member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))   
    } else {
        res.status(400).json({mes: `member ${req.params.id} not found`})
    }
})

// create member 
router.post('/', (req, res)  => {
    // res.send(req.body)

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
       return res.status(400).json({ msg: 'please include name and email' })
    } 

    members.push(newMember)
//for api call only
    // res.json(members)
    // for reload 
    res.redirect('/')
})

// update member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
       const updMember  = req.body
       members.forEach(member => {
           if (member.id === parseInt(req.params.id)) {
               member.name = updMember.name ? updMember.name : member.name 
               member.email  = updMember.email ? updMember.email : member.email
               
               res.json({ msg: 'member  updated', member})
           }
       })  
    } else {
        res.status(400).json({mes: `member ${req.params.id} not found`})
    }
})

// delete member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({msg: 'member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})   
    } else {
        res.status(400).json({mes: `member ${req.params.id} not found`})
    }
})


module.exports = router