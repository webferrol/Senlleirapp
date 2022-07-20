// Libreria
import { library } from "@fortawesome/fontawesome-svg-core";
// Menu
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {faMap} from "@fortawesome/free-solid-svg-icons";
import {faImages} from "@fortawesome/free-solid-svg-icons";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
// Carrusel
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {faCircle as faCircleRegular} from "@fortawesome/free-regular-svg-icons";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
//Admin icons
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import {faRegistered} from "@fortawesome/free-solid-svg-icons";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
// ficha
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { faTreeCity } from "@fortawesome/free-solid-svg-icons";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const iconsLibrary = () => {
    library.add(
        faHome,
        faUser,
        faMap,
        faImages,
        faUpload,
        faCircle,
        faCircleRegular,
        faAngleLeft,
        faAngleRight,
        faTrash,
        faPen,
        faGears,
        faCircleExclamation,
        faLeaf,
        faLocationDot,
        faMagnifyingGlass,
        faXmark,
        faSliders,
        faTree,
        faTreeCity,
        faSignature,
        faUpLong,
        faArrowsLeftRight,
        faCalendarDays,
        faRegistered,
        
    )
}
