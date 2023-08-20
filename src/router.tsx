import { Router } from "./framework";
import { About } from "./pages/About";
import { UserList } from "./pages/UserList";

export const router = new Router();

router.routeToComponent("/about", <About message="Hello from server!" />);
router.routeToComponent("/users", <UserList />);
