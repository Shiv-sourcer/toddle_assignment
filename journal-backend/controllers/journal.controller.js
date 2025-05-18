const { Journal, Student } = require('../models');

exports.createJournal = async (req, res) => {
  try {
    const { description, taggedStudentIds, publishedAt } = req.body;
    let attachment = null;

    // If a file was uploaded, build attachment info
    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      const fileType = req.file.mimetype.startsWith('image/') ? 'image' :
                       req.file.mimetype.startsWith('video/') ? 'video' : 'pdf';

      attachment = {
        type: fileType,
        url: fileUrl
      };
    }

    // Create the journal record
    const journal = await Journal.create({
      description,
      publishedAt,
      attachment: attachment ? JSON.stringify(attachment) : null,
      createdBy: req.user.id // user id from auth middleware
    });

    // Tag students logic (assuming many-to-many relation)
    if (taggedStudentIds && taggedStudentIds.length > 0) {
      const students = await Student.findAll({
        where: { id: taggedStudentIds }
      });
      await journal.setStudents(students);
    }

    res.status(201).json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create journal' });
  }
};
