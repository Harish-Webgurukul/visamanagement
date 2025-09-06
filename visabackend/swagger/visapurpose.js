/**
 * @swagger
 * tags:
 *   name: VisaPurposes
 *   description: Visa purpose endpoints
 */

/**
 * @swagger
 * /visapurpose:
 *   get:
 *     summary: Get all visa purposes
 *     tags: [VisaPurposes]
 *
 *   post:
 *     summary: Create a new visa purpose
 *     tags: [VisaPurposes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 */

/**
 * @swagger
 * /visapurpose/{id}:
 *   get:
 *     summary: Get a visa purpose by ID
 *     tags: [VisaPurposes]
 *
 *   put:
 *     summary: Update a visa purpose by ID
 *     tags: [VisaPurposes]
 *
 *   delete:
 *     summary: Delete a visa purpose by ID
 *     tags: [VisaPurposes]
 */
