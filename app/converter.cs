using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Models;
using Umbraco.Core.PropertyEditors;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core;

namespace ClassyConverter
{
    [PropertyValueType(typeof(MemberLicense))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class MemberLicenseConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(Core.Models.PublishedContent.PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("DriversLicenseEditor");
        }

        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return null;
            var sourceString = source.ToString();

            if (sourceString.DetectIsJson())
            {
                try
                {
                    dynamic obj = JsonConvert.DeserializeObject<dynamic>(sourceString);
                    var license = new MemberLicense();
                    license.Name = obj.name;
                    license.IdentificationNumber = obj.licenseNumber;

                    int mediaId = 0;

                    if(int.TryParse(obj.mediaId.ToString(), out mediaId)){
                        license.Image = UmbracoContext.Current.MediaCache.GetById(mediaId);
                    }

                    return license;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }

            return sourceString;
        }
    }

    public class MemberLicense
    {
        public string Name { get; set; }
        public string IdentificationNumber { get; set; }
        public IPublishedContent Image { get; set; }
    }
}