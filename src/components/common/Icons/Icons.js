import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const icons = {
    viewOn: VisibilityIcon,
    viewOff: VisibilityOffIcon,
    search: SearchIcon,
    edit: EditIcon,
    delete: DeleteForeverIcon,
    checked: CheckCircleIcon,
    cancel: CancelIcon,
    warning: WarningIcon,
    notesIcon: TextSnippetIcon,
    more: MoreVertOutlinedIcon,
    forwardArrow: ArrowForwardIosOutlinedIcon,
    arrowBack: ArrowBackIosNewOutlinedIcon,
};
const Icons = React.forwardRef((props, ref) => {
    const { name, size, color, ...others } = props;
    const Icon = icons[name];
    return <Icon ref={ref} sx={{ fontSize: size, color: color }} {...others} />;
});

export default Icons;
