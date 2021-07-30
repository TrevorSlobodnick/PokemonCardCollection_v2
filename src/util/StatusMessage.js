import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export class StatusMessage{

    static DEFAULT_SETTINGS = {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Slide
    }

    static showSuccessMessage(message){
        toast.success("\u2705 " + message, this.DEFAULT_SETTINGS)
        //alt checkmark = \u2714
    }

    static showErrorMessage(message){
        toast.error("\u2757 " + message, this.DEFAULT_SETTINGS)
    }
}
