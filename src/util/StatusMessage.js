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

    static showSuccessMessage(){
        toast.success(<this.SuccessMessage text="Successfully added card" />)
        //alt checkmark = \u2714
    }

    static showErrorMessage(message){
        toast.error(<this.ErrorMessage text="Could not add card." errorMsg={message} />)
    }

    static SuccessMessage({closeToast, toastProps, text}){
        return <div className="toast">
            <p className="toastUnicode">{"\u2705"}</p>
            <div className="toastDiv">
                <p className="toastStatus">{text}</p>
            </div>
        </div>
    }

    static ErrorMessage({closeToast, toastProps, text, errorMsg}){
        return <div className="toast">
            <p className="toastUnicode">{"\u2757"}</p>
            <div className="toastDiv">
                <p className="toastStatus">{text}</p>
                <p className="errorMessage">{errorMsg}</p>
            </div>
        </div>
    }
}
