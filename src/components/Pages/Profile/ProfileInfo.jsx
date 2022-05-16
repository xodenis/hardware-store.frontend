import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { editInfo, getInfo } from '../../../services/user'
import Input from '../../Input'

export const ProfileInfo = ({ editMode = false }) => {
  const { loading, user } = useSelector((state) => state.userSlice)

  const [userInfo, setUserInfo] = useState({})
  const [dirty, setDirty] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
    setDirty(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    store.dispatch(editInfo(userInfo))
    setDirty(false)
  }

  const handleCancel = () => {
    setUserInfo(user)
    setDirty(false)
  }

  useEffect(() => {
    store.dispatch(getInfo())
  }, [])

  useEffect(() => {
    setUserInfo(user)
  }, [user])

  return (
    <form className="profile-info" onSubmit={handleSubmit}>
      <h2 className="profile-info-title">Персональные данные</h2>
      <div className="profile-info-items">
        <div className="profile-info-item">
          <Input
            name="surname"
            type="text"
            label="Фамилия"
            value={userInfo.surname}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info-item">
          <Input
            name="surname"
            type="text"
            label="Имя"
            value={userInfo.name}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info-item">
          <Input
            name="email"
            type="text"
            label="Электронная почта"
            value={userInfo.email}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info-item">
          <Input
            name="phone"
            type="text"
            label="Телефон"
            value={userInfo.phone}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info-item">
          <Input
            name="city"
            type="text"
            label="Город"
            value={userInfo.city}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info-item">
          <Input
            name="address"
            type="text"
            label="Адрес"
            value={userInfo.address}
            readOnly={editMode ? false : true}
            onChange={handleChange}
          />
        </div>
      </div>
      {dirty && (
        <div className="profile-info-controls">
          <button type="submit" className="profile-info-controls-save">
            Сохранить
          </button>
          <button
            type="button"
            className="profile-info-controls-cancel"
            onClick={() => handleCancel()}>
            Отменить
          </button>
        </div>
      )}
    </form>
  )
}
