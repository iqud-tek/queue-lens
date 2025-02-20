import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queueNavLinks } from "@/constants";
import { QueueNavLinks } from "@/types/dashboard.types";
import { MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface QueueDetailMobileNavbarProps {
  activeTab: QueueNavLinks;
  setActiveTab: Dispatch<SetStateAction<QueueNavLinks>>;
}

const QueueDetailMobileNavbar = ({
  activeTab,
  setActiveTab,
}: QueueDetailMobileNavbarProps) => {
  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Queue Nav links</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="space-y-2">
            {queueNavLinks.map((link, i) => (
              <DropdownMenuItem
                className={activeTab === link.link ? "font-bold underline" : ""}
                onClick={() => setActiveTab(link.link)}
                key={i}
              >
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QueueDetailMobileNavbar;
