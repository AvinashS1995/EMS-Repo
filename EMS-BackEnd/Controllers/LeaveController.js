import { Holidays } from "../Models/holidayModel.js";


const GetUpcomingHolidays = async (req, res) => {

    try {

        const today = new Date();
        const holidays = await Holidays.find({ date: { $gte: today } }).sort({ date: 1 }).select('-__v');

        if(!holidays) {
            return res.status(404).json({
                status: 'fail',
                message: 'Holidays Not Found..!'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Record(s) Successfully Fetched..!',
            data: {
                upComingHolidays: holidays
            }
        })
        
    } catch (error) {
console.log(error)
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
        
    }
}

export { GetUpcomingHolidays }