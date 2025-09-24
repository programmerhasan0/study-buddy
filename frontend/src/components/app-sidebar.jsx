import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import {Link, useNavigate} from 'react-router';
import {MdOutlineQuiz} from 'react-icons/md';
import {GoNote} from 'react-icons/go';
import {LuNotebook, LuLayoutDashboard} from 'react-icons/lu';
import {BsCardList} from 'react-icons/bs';
import {RxCardStack, RxHome} from 'react-icons/rx';
import {TbCalendarQuestion} from 'react-icons/tb';
import {BiLogOutCircle} from 'react-icons/bi';
import {useAuthContext} from '../context/Auth.context';
import axios from 'axios';

export function AppSidebar() {
    const {
        user: [user, setUser],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
    } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {
        axios
            .post(
                `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
                {},
                {withCredentials: true}
            )
            .then((response) => {
                if (response.data.status === 200) {
                    navigate('/');
                    setUser(null);
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => {});
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to="/user/dashboard">
                            <LuLayoutDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Notes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/note/generate">
                                        <GoNote />
                                        <span>Generate note</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/notes/view">
                                        <LuNotebook />
                                        <span>View generated notes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Flashcards</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/flashcard/generate">
                                        <BsCardList />
                                        <span>Generate flashcard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/flashcard/view">
                                        <RxCardStack />
                                        <span>View generated flashcards</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Quizzes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/quiz/generate">
                                        <MdOutlineQuiz />
                                        <span>Generate quiz</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/user/quiz/view">
                                        <TbCalendarQuestion />
                                        <span>View generated quizzes</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/">
                                        <RxHome />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <div
                                        className="cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <BiLogOutCircle />
                                        <span>Logout</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}
