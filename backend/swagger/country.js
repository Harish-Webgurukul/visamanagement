/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country endpoints
 */

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *
 *   post:
 *     summary: Create a new country
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 */

/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Countries]
 *
 *   put:
 *     summary: Update a country by ID
 *     tags: [Countries]
 *
 *   delete:
 *     summary: Delete a country by ID
 *     tags: [Countries]
 */
