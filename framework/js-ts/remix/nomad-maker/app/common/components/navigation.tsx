import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/common/components/ui/navigation-menu";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

const menu = [
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
    items: [],
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
            Wemake
          </Link>
          <Separator orientation="vertical" className="h-6 mx-4" />
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menu.items?.map((item) => (
                      <NavigationMenuItem key={item.name}>
                        <Link to={item.to}>{item.name}</Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuContent>
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
