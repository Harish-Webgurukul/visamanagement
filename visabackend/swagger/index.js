const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();


const options = {
definition: {
openapi: '3.0.0',
info: {
title: 'Visa Management API',
version: '1.0.0',
description: 'API documentation for Visa Management System',
},
servers: [
{
url: 'http://localhost:5000/api',
description: 'Development server',
},
],
},
apis: [
'./swagger/user.js',
'./swagger/role.js',
'./swagger/country.js',
'./swagger/visapurpose.js',
'./swagger/visaoption.js',
'./swagger/document.js',
'./swagger/enquiry.js',
'./swagger/followup.js',
'./swagger/customerdoc.js',
'./swagger/notification.js',
'./swagger/auditlog.js',
'./swagger/permission.js',
'./swagger/sharelink.js',
],
};


const swaggerSpec = swaggerJsdoc(options);


router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = router;