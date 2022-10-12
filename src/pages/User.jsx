import {useContext,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import GitHubContext from '../context/github/GithubContext';
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import Spinner from '../components/layout/Spinner';
import ReposList from '../components/repos/ReposList';


function User() {
    const {getUser,user,loading,getUserRepos,repos}=useContext(GitHubContext);
    const {login}=useParams();
    useEffect(()=>{
        getUser(login);
        getUserRepos(login);
    },[]);

    //destructuring all properties from user object
    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
      } = user;



      const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog
    if(loading){
        return <Spinner />
    }
  return (
    <>
    <div className='w-full mx-auto lg:w-10/12'>
      <div className='mb-4'>
        <Link to='/' className='btn btn-ghost'>
          Back To Search
        </Link>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
        <div className='custom-card-image mb-6 md:mb-0'>
          <div className='rounded-lg shadow-xl card image-full'>
            <figure>
              <img src={avatar_url} alt='' />
            </figure>
            <div className='card-body justify-end'>
              <h2 className='card-title mb-0'>{name}</h2>
              <p className='flex-grow-0'>{login}</p>
            </div>
          </div>
        </div>

        <div className='col-span-2'>
          <div className='mb-6'>
            <h1 className='text-3xl card-title'>
              {name}
              <div className='ml-2 mr-1 badge badge-success'>{type}</div>
              {hireable && (
                <div className='mx-1 badge badge-info'>Hireable</div>
              )}
            </h1>
            <p>{bio}</p>
            <div className='mt-4 card-actions'>
              <a
                href={html_url}
                target='_blank'
                rel='noreferrer'
                className='btn btn-outline'
              >
                Visit Github Profile
              </a>
            </div>
          </div>

          <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
            {location && (
              <div className='stat'>
                <div className='stat-title text-md'>Location</div>
                <div className='text-lg stat-value'>{location}</div>
              </div>
            )}
            {blog && (
              <div className='stat'>
                <div className='stat-title text-md'>Website</div>
                <div className='text-lg stat-value'>
                  <a href={websiteUrl} target='_blank' rel='noreferrer'>
                    {websiteUrl}
                  </a>
                </div>
              </div>
            )}
            {twitter_username && (
              <div className='stat'>
                <div className='stat-title text-md'>Twitter</div>
                <div className='text-lg stat-value'>
                  <a
                    href={`https://twitter.com/${twitter_username}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {twitter_username}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
        <div className='grid grid-cols-1 md:grid-cols-4'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUsers className='text-3xl' />
            </div>
            <div className='stat-title pr-1'>Followers</div>
            <div className='stat-value pr-1 text-3xl '>
              {followers}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaUserFriends className='text-3xl ' />
            </div>
            <div className='stat-title pr-1'>Following</div>
            <div className='stat-value pr-1 text-3xl '>
              {following}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaCodepen className='text-3xl ' />
            </div>
            <div className='stat-title pr-1'>Public Repos</div>
            <div className='stat-value pr-1 text-3xl '>
              {public_repos}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <FaStore className='text-3xl ' />
            </div>
            <div className='stat-title pr-1'>Public Gists</div>
            <div className='stat-value pr-1 text-3xl '>
              {public_gists}
            </div>
          </div>
        </div>
      </div>

      <ReposList repos={repos} />
    </div>
  </>
    // <>
    // <div className="w-full mx-auto ">
    // <div className="mb4 -mt-20 mr-5">
    //     <Link to='/' className='btn btn-ghost -mt-10'>Back To Search</Link>
    // </div>
    // <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 gap-8 ">
    //     <div className=" flex-row custom-card-image mb-6 mr-20">
    //         <div className="rounded-lg shadow-xl card-image-full ">
    //             <figure>
    //                 <img src={avatar_url} alt='' />
    //             </figure>
    //             <div className='card-body justify-end'>
    //             <h2 className='card-title mb-0 text-white justify-center'>{name}</h2>
    //             <p className='flex-grow-0 text-white text-center'>{login}</p>
    //           </div>
    //         </div>


    //         <div className="col-span-2">
    //             <div className="mb-g">
    //                 <h1 className="text-3xl card-title">
    //                     {name}
    //                     <div className="ml-2 mr-1 badge badge-success">
    //                         {type}
    //                     </div>
    //                     {
    //                         hireable &&(
    //                             <div className="mx-1 badge badge-info">Hireable</div>
    //                         )
    //                     }
    //                 </h1>
    //                 <p>{bio}</p>
    //                 <div className="mt-4 card-actions">
    //                     <a href={html_url} target="_blank" rel='noreferrer' className='btn btn-outline'>
    //                         Visit Github profile
    //                     </a>
    //                 </div>
    //             </div>

    //             <div className=" mt-6 sm:w-300 md:w-450 rounded-ld shadow-md bg-base-100 stats">
    //                 {location && (
    //                     <div className="stat">
    //                         <div className="stat-title text-md">Location</div>
    //                         <div className="text-lg stat-value">{location}</div>
    //                     </div>
    //                 )}
    //                 {blog && (
    //                     <div className="stat">
    //                         <div className="stat-title text-md">Website</div>
    //                         <div className="text-lg stat-value">
    //                         <a href={`https://${blog}`}
    //                         target='_blank'
    //                         rel='noreferrer'>{blog}</a>
    //                         </div>
                            
    //                     </div>
    //                 )}
    //                 {twitter_username && (
    //                     <div className="stat">
    //                         <div className="stat-title text-md">Twitter</div>
    //                         <div className="text-lg stat-value">
    //                         <a href={`https://twitter.com/${twitter_username}`}
    //                         target='_blank'
    //                         rel='noreferrer'>{twitter_username}</a>
    //                         </div>
                            
    //                     </div>
    //                 )}

    //             </div>
    //         </div>
    //     </div>
        
    // </div>
    // <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
    //     <div className="stat">
    //         <div className="stat-figure text-secondary">
    //             <FaUsers className='text-3xl ' />
    //         </div>
    //         <div className="stat-title pr-5">
    //             Followers
    //         </div>
    //         <div className="stat-value pr-5 text-3xl ">{followers}</div>
    //     </div>
    //     <div className="stat">
    //         <div className="stat-figure text-secondary">
    //             <FaUserFriends className='text-3xl ' />
    //         </div>
    //         <div className="stat-title pr-5">
    //             Following
    //         </div>
    //         <div className="stat-value pr-5 text-3xl">{following}</div>
    //     </div>
    //     <div className="stat">
    //         <div className="stat-figure text-secondary">
    //             <FaCodepen className='text-3xl ' />
    //         </div>
    //         <div className="stat-title pr-5">
    //             Public Repos
    //         </div>
    //         <div className="stat-value pr-5 text-3xl ">{public_repos}</div>
    //     </div>
    //     <div className="stat">
    //         <div className="stat-figure text-secondary">
    //             <FaStore className='text-3xl ' />
    //         </div>
    //         <div className="stat-title pr-5">
    //             Public Gists
    //         </div>
    //         <div className="stat-value pr-5 text-3xl ">{public_gists}</div>
    //     </div>
    // </div>
    //   <ReposList repos={repos}/>
    // </div>
    
    
    
    // </>
  )
}

export default User





//to display user

//1. a function tht makes a request to get that specific user (declared in context)
 //2. in that function we have a reducer to add that user into state