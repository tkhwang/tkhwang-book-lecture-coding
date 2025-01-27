import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/common/components/ui/navigation-menu";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performancers in your community",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "See the top categories in your community",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search",
      },
      {
        name: "Submit a product",
        description: "Submit a product to the community",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "Promote a product to the community",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find remote jobs in your community",
        to: "/jobs/location=remote",
      },

      {
        name: "Freelance Jobs",
        description: "Find freelance jobs in your community",
        to: "/jobs/location=freelance",
      },
      {
        name: "Internships",
        description: "Find internships in your community",
        to: "/jobs/location=internship",
      },
      {
        name: "Submit a job",
        description: "Submit a job to the community",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts in the community",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "See the top posts in the community",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "See the new posts in the community",
        to: "/community?sort=new",
      },
      {
        name: "Submit a post",
        description: "Submit a post to the community",
        to: "/community/submit",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "See all teams in the community",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "Create a team in the community",
        to: "/teams/create",
      },
    ],
  },
];

function Navigation() {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div>
        <div className="flex items-center">
          <Link to="/" className="font-bold tracking-tighter text-lg">
            wemake
          </Link>
          <Separator orientation="vertical" className="h-6 mx-4" />
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.items ? (
                    <>
                      <Link to={menu.to}>
                        <NavigationMenuTrigger>
                          {menu.name}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                          {menu.items?.map((item) => (
                            <NavigationMenuItem
                              key={item.name}
                              className={cn([
                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                (item.to === "/products/promote" ||
                                  item.to === "/jobs/submit") &&
                                  "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              ])}
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  className="p-3 space-y-1 block leading-none no-underline outline-none"
                                  to={item.to}
                                >
                                  <span className="text-sm font-medium leading-none">
                                    {item.name}
                                  </span>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                      {menu.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
