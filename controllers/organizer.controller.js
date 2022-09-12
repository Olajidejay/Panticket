import Organizer from "../models/organizer.model";

export async function createOrganizer(req, res) {
  try {
    const organizer = await Organizer.create(req.body);
    return res.status(201).json({
      message: "organizer created successfully",
      organizer: organizer,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Issues processing your request",
    });
  }
}

export function deleteOrganizer(req, res) {
  Organizer.findByIdAndDelete(req.params.id, function (err, deleted) {
    if (err) {
      return res.status(400).json({
        message: "issues deleting organizer " + err.message,
      });
    }
    return res.status(200).json({
      message: "organizer deleted ",
    });
  });
}

export function updateOrganizer(req, res) {
  Organizer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" },
    function (err, updated) {
      if (err) {
        return res.status(400).json({
          message: "issues updating organizer " + err.message,
        });
      }
      return res.status(200).json({
        message: "organizer updated",
        organizer: updated,
      });
    }
  );
}

export function fetchOrganizers(req, res) {
  Organizer.find({}, function (err, organizers) {
    if (err)
      return res.status(400).json({
        message: "issues fetching organizers " + err.message,
      });
    return res.status(200).json({
      message: "organizers fetched",
      organizers,
    });
  });
}

export function fetchOrganizerById(req, res) {
  Organizer.findById(req.params.id, function (err, organizer) {
    if (err)
      return res.status(400).json({
        message: "issues fetching organizer " + err.message,
      });
    return res.status(200).json({
      message: "organizer fetched",
      organizer,
    });
  });
}
