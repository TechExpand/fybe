
import logo from "../image/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
     <footer className="px-4 py-8   text-neutral-600">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
    <div className=" w-24 ">
                <Link
 to={"/"}
 className=" cursor-pointer z-10"
>
                  <img src={logo}></img>
                  </Link>
                </div>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<a href="#">Terms of Use</a>
				</li>
				<li>
					<a href="#">Privacy</a>
				</li>
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
			<li>
				<a href="#">Instagram</a>
			</li>
			<li>
				<a href="#">Facebook</a>
			</li>
			<li>
				<a href="#">Twitter</a>
			</li>
		</ul>
	</div>
  <div className="container border-t-2 mt-5 pt-6 text-sm text-center">© 2022 Company Co. All rights reserved.</div>
</footer>
    </>
  );
}



export default Footer