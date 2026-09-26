import { useTheme } from "../../Context/ThemeContext";

function NotificationDropdown({

notifications = [],

deleteNotification

}) {

  const { darkMode } = useTheme();

  return (

    <div
      className={`
      absolute
      right-0
      top-12
      w-80
      rounded-2xl
      shadow-xl
      border
      p-4
      z-50
      ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }
      `}
    >

      <h3 className="text-lg font-bold mb-4">

        Notifications

      </h3>

      {

        notifications.length === 0

        ?

        (

          <p className="text-sm text-gray-500">

            No notifications

          </p>

        )

        :

        (

          <div className="space-y-3">

            {

              notifications.map(item=>(

                <div

                
                  key={item.id}

                  onClick={()=>deleteNotification(item.id)}

                  className={`
                  cursor-pointer
                  rounded-xl
                  p-3
                  transition
                  ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700"
                      : "bg-blue-50 hover:bg-blue-100"
                  }
                  `}

                >

                  <h4 className="font-semibold">

                    {item.title}

                  </h4>

                  <p className="text-sm mt-1">

                    {item.message}

                  </p>

                  <p className="text-xs opacity-60 mt-2">

                    {

                      new Date(
                        item.created_at
                      ).toLocaleString()

                    }

                  </p>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default NotificationDropdown;