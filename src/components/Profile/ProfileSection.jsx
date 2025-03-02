import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { FaSellsy } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';

function ProfileSection({ params }) {
    return (
        <div id="profile-head" className="bg-gradient-to-b from-background-secondary to-background-tertiary py-6 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0 text-center md:text-left">
                        <img 
                            id="avatar" 
                            alt="avatar" 
                            src={params.avatar} 
                            className="w-36 h-36 rounded-full object-cover mx-auto md:mx-0"
                        />
                    </div>
                    <div className="flex-grow space-y-2">
                        <p className="flex items-center justify-center md:justify-start text-sm">
                            <BsFillPersonFill className="mr-2 text-accent-primary" /> {params.name}
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-sm">
                            <MdEmail className="mr-2 text-accent-secondary" /> {params.email}
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-sm">
                            <MdPhoneAndroid className="mr-2 text-accent-tertiary" /> {params.phoneNumber}
                        </p>
                        <p className="flex items-center justify-center md:justify-start text-sm">
                            <FaSellsy className="mr-2 text-accent-primary" /> {params.totalSells} sells in total
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Link 
                            to={`/profile/${params._id}/edit`}
                            className="text-2xl text-text-secondary hover:text-accent-primary transition-colors duration-300"
                            title="Edit profile"
                        >
                            <GrEdit className="filter invert opacity-70 hover:opacity-100" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;