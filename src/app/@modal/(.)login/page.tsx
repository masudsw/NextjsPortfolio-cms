import { Modal } from "@/components/modal";
import LoginForm from "@/components/ui/login-form";
import { Suspense } from "react";



const Page = () => {
    
    return (
        <Modal>
           <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
        </Modal>
        
    );
};

export default Page;