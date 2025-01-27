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
import { Button, buttonVariants } from "~/common/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

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

interface NavigationProps {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}

function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: NavigationProps) {
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
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/tkhwang.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dasboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant={"outline"}>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/signup">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
