/**
 * @swagger
 * tags:
 *   name: Enquiry
 *   description: Enquiry management APIs
 */

/**
 * @swagger
 * /enquiry:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Enquiry]
 *     responses:
 *       200:
 *         description: List of enquiries
 *
 *   post:
 *     summary: Create a new enquiry
 *     tags: [Enquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enquiry'
 *     responses:
 *       201:
 *         description: Enquiry created
 */

/**
 * @swagger
 * /enquiry/{id}:
 *   get:
 *     summary: Get enquiry by ID
 *     tags: [Enquiry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry details
 *
 *   put:
 *     summary: Update an enquiry
 *     tags: [Enquiry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enquiry'
 *     responses:
 *       200:
 *         description: Enquiry updated
 *
 *   delete:
 *     summary: Delete an enquiry
 *     tags: [Enquiry]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry deleted
 */
