import { Link, Outlet } from "react-router-dom";
import Button from "../../components/ui/Button";
export default function Certificates() {
    return (
        <div className="bg-white p-2 rounded-lg shadow-sm  ">
            <div className="flex items-center gap-4 p-2">
                <Link to={"experience"}>
                    <Button>Experience</Button>
                </Link>
                <Link to={"probation"}>
                    <Button>Probation</Button>
                </Link>
                <Link to={"trainee"}>
                    <Button>Trainee</Button>
                </Link>
                <Link to={"offerletter"}>
                    <Button>OfferLetter</Button>
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
