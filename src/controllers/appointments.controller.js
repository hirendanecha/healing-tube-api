const utils = require("../helpers/utils");
const Appointments = require("../models/appointments.model");
const moment = require("moment");

const { getPagination, getCount, getPaginationData } = require("../helpers/fn");

exports.findAll = async (req, res) => {
  const { page, size, search, startDate, endDate } = req.body;
  const { limit, offset } = getPagination(page, size);
  const searchCountData = await Appointments.findAndSearchAll(
    limit,
    offset,
    search,
    startDate,
    endDate
  );
  return res.send(
    getPaginationData(
      { count: searchCountData.count, docs: searchCountData.data },
      page,
      limit
    )
  );
};

exports.createAppointment = async (req, res) => {
  const data = req.body?.appointment;
  const topics = req.body?.topics;
  const date = moment(data.appointmentDateTime).format("YYYY-MM-DD HH:MM:SS");
  console.log(date);
  const appointmentData = {
    appointmentDateTime: date,
    profileId: data.profileId,
    practitionerProfileId: data.practitionerProfileId,
    practitionerName: data.practitionerName,
  };
  const slug = req.body?.slug;
  if (appointmentData) {
    const oldAppointment = await Appointments.findAppointmentByDate(date);
    if (oldAppointment.length) {
      return res.json(
        "Appointments already book with other patient, please select other slots!"
      );
    } else {
      const id = await Appointments.createAppointments(appointmentData);
      const emailData = {
        profileId: appointmentData.profileId,
        practitionerProfileId: appointmentData.practitionerProfileId,
        topics: topics,
        slug: slug,
        date: moment(date).format("YYYY-MM-DDTHH:mm:ss[Z]"),
      };
      await utils.sendAppointmentMailToPractitioner(emailData);
      await utils.sendAppointmentMailToUser(emailData);
      console.log(id);
      if (id) {
        return res.json({
          error: false,
          message: "Your appointment is booked please check your mail.",
        });
      } else {
        return res
          .status(401)
          .send({ error: true, message: "something went wrong" });
      }
    }
  }
};
