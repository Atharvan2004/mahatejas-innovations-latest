import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import IMG404 from "@/assets/images/img404.jpg";
import { Link } from "react-router-dom";


export function CardDefault({title, price,img,to}) {
  return (
    <Card className="mt-6 w-4/6 mx-auto px-6">
      <img
        src={img&&img.length > 0 ? img[0] : IMG404}
        className="mx-auto mb-2 aspect-square h-52 object-cover md:h-auto md:w-[90%] md:p-5"
      />
      <CardBody className=" -mb-3">
        <Typography variant="h5" color="blue-gray" className="mb-2 -mt-6">
          {title}
        </Typography>
        <p className="px-5 text-center text-xl uppercase">
        {price}
      </p>
      </CardBody>
      <CardFooter className="pt-0">
      <Link to={to}>
      <Button>View Product</Button>
    </Link>
        
      </CardFooter>
    </Card>
  );
}
