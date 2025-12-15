import { useState, useEffect } from 'react';
import { adminTranslations } from '../../translations/adminTranslations';
import { contactsAPI } from '../../services/api';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = adminTranslations.ar.contacts;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactsAPI.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = async (contact) => {
    try {
      // Fetch contact details to mark as read
      await contactsAPI.getById(contact.id);
      setSelectedContact(contact);
      // Reload to update read status
      await loadContacts();
    } catch (err) {
      setError(err.message || 'حدث خطأ في تحميل الرسالة');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-olive-green mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
            {t.title}
          </h1>
          <p className="text-warm-gray/70" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            إدارة رسائل التواصل
            {unreadCount > 0 && (
              <span className="mr-2 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                {unreadCount} غير مقروء
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.search}
            className="w-full px-4 py-3 pr-12 border border-natural-wood/30 rounded-xl focus:ring-2 focus:ring-olive-green/50 focus:border-olive-green transition-all outline-none"
            style={{ fontFamily: "'Alexandria', sans-serif" }}
          />
          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" style={{ fontFamily: "'Alexandria', sans-serif" }}>
          {error}
        </div>
      )}

      {/* Contacts List */}
      {loading && contacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            جاري التحميل...
          </p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <svg className="w-16 h-16 text-warm-gray/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
            {t.noContacts}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleViewContact(contact)}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover-lift transition-all border-2 ${
                  selectedContact?.id === contact.id
                    ? 'border-olive-green'
                    : contact.isRead
                    ? 'border-transparent'
                    : 'border-red-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-olive-green" style={{ fontFamily: "'Zain', sans-serif" }}>
                        {contact.name}
                      </h3>
                      {!contact.isRead && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-warm-gray/70 mb-1" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                      {contact.email}
                    </p>
                    {contact.phone && (
                      <p className="text-sm text-warm-gray/60 mb-2" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                        {contact.phone}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-warm-gray/80 line-clamp-2 mb-3" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                  {contact.message}
                </p>
                <p className="text-xs text-warm-gray/50" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                  {formatDate(contact.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-olive-green mb-2" style={{ fontFamily: "'Zain', sans-serif" }}>
                      {selectedContact.name}
                    </h2>
                    <p className="text-warm-gray/70 mb-1" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                      {selectedContact.email}
                    </p>
                    {selectedContact.phone && (
                      <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                        {selectedContact.phone}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      selectedContact.isRead
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                    style={{ fontFamily: "'Zain', sans-serif" }}
                  >
                    {selectedContact.isRead ? 'مقروء' : 'غير مقروء'}
                  </span>
                </div>

                <div className="mb-6 pb-6 border-b border-natural-wood/20">
                  <p className="text-sm text-warm-gray/60 mb-2" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                    تاريخ الإرسال
                  </p>
                  <p className="text-warm-gray/80" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-olive-green mb-4" style={{ fontFamily: "'Zain', sans-serif" }}>
                    الرسالة
                  </h3>
                  <div className="bg-sand-beige/30 rounded-xl p-6">
                    <p className="text-warm-gray/80 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <svg className="w-16 h-16 text-warm-gray/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-warm-gray/60" style={{ fontFamily: "'Alexandria', sans-serif" }}>
                  اختر رسالة لعرض التفاصيل
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;

