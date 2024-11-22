import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => {
    toggleTheme();
    toast.success(`Theme changed to ${theme === 'light' ? 'dark' : 'light'} mode`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your account settings</p>
          </header>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={handleThemeChange}
                      aria-label="Toggle theme"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-6">
                <form className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input placeholder="Enter company name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input placeholder="Enter address" />
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <p className="text-gray-500">Configure how you receive notifications</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;