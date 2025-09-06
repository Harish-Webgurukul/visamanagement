/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management APIs
 */

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: List of notifications
 *
 *   post:
 *     summary: Create a notification
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created
 */

/**
 * @swagger
 * /notification/{id}:
 *   get:
 *     summary: Get notification by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification details
 *
 *   put:
 *     summary: Update a notification
 *     tags: [Notification]
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
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification updated
 *
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted
 */
