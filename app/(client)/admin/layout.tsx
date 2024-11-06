import { auth } from "@/auth";
import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/vs-nav.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminLink from "@/components/admin/AdminLink";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegChessKing } from "react-icons/fa6";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import Image from "next/image";
import { User } from "@/utils/types";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user: User | null = session?.user ? (session.user as User) : null;

  const AdminLinks = [
    {
      id: 1,
      title: "Overview",
      href: "/admin/overview",
      icon: <MdOutlineSpaceDashboard className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Showcases",
      href: "/admin/showcases",
      icon: <FaRegChessKing className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Blogs",
      href: "/admin/blogs",
      icon: <RiArticleLine className="h-4 w-4" />,
    },
    {
      id: 4,
      title: "Notifications",
      href: "/admin/notifications",
      icon: <MdOutlineNotifications className="h-4 w-4" />,
    },
    {
      id: 5,
      title: "Jobs",
      href: "/admin/jobs",
      icon: <TbReportSearch className="h-4 w-4" />,
    },
  ];

  const isadmin = user?.role === "ADMIN";
  if (!isadmin) {
    return null;
  }
  return (
    <div className="w-full h-full" dir="ltr">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-semibold"
              >
                <Image
                  src={Logo}
                  alt="vosooghi studio"
                  width={50}
                  height={50}
                  className="w-[35px]"
                />
                <span className="text-sm text-neutral-400">
                  Vosooghi Studio
                </span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {AdminLinks.map((link) => (
                  <AdminLink
                    title={link.title}
                    href={link.href}
                    key={link.id}
                    icon={link.icon}
                  />
                ))}
              </nav>
              {/* <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/showcases"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Showcases
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="/admin/blogs"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Package className="h-4 w-4" />
                  Blogs
                </Link>
                <Link
                  href="/admin/notifications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Notifications
                </Link>
                <Link
                  href="/admin/jobs"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Jobs
                </Link>
              </nav> */}
            </div>
            <div className="mt-auto p-4">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[65px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav
                  className="grid items-start px-2 text-sm font-medium lg:px-4"
                  dir="ltr"
                >
                  {AdminLinks.map((link) => (
                    <AdminLink
                      title={link.title}
                      href={link.href}
                      key={link.id}
                      icon={link.icon}
                    />
                  ))}
                </nav>
                <div className="mt-auto" dir="ltr">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-[200px] appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    {user?.image && (
                      <Image
                        src={user?.image}
                        alt=""
                        width={45}
                        height={45}
                        className="rounded-full h-8 w-8"
                      />
                    )}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="w-full h-full p-4 lg:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
