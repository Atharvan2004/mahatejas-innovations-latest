import BrushLessMotor from "@/assets/images/about/BrushLessMotor.webp";
import Propellers from "@/assets/images/about/Propellers.jpg";
import BrushLessESC from "@/assets/images/about/BrushLessESC.jpg";
import Drone from "@/assets/images/about/Drone.jpg";

export default function ImgCollage() {
  return (
    <div className="w-full lg:w-2/5">
      <div className="flex w-full">
        <div className="w-1/2">
          <img src={Propellers} className="object-cover" alt="Propellers" />
          <img src={BrushLessESC} className="object-cover" alt="BrushLessESC" />
        </div>
        <img
          className="w-1/2 object-cover"
          src={BrushLessMotor}
          alt="BrushLessMotor"
        />
      </div>
      <img className="w-full object-cover" src={Drone} alt="Drone" />
    </div>
  );
}
