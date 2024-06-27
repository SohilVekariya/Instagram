import { SideNavbar } from "../../components/SideNavbar/SideNavbar"
import CustomButton from "../../components/shared/CustomButton"

const Home = () => {
  return (
    <div>
    <SideNavbar/>
    <CustomButton
              type="button"
              title="Log Out"
              className="text-sky-500 font-semibold"
            />
    </div>
  )
}

export default Home